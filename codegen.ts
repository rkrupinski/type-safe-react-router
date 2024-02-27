import { writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const SRC = './src/routes.tsx';
const TARGET = './src/paths.tsx';

/**
 * Don't try this at home. This simply illustrates the idea and arguably
 * should be implemented in a more robust manner.
 */
const poorMansCodegenLOL = (src: string) => {
  const source = ts.createSourceFile(
    src.split('/').at(-1) ?? '',
    readFileSync(src).toString(),
    ts.ScriptTarget.Latest,
  );

  const transformer: ts.TransformerFactory<ts.Node> = context => parent => {
    const visitor = (node: ts.Node): ts.Node => {
      // Strip JSX
      if (node.kind === ts.SyntaxKind.JsxSelfClosingElement)
        return ts.factory.createNull();

      return ts.visitEachChild(
        node,
        node => {
          switch (true) {
            // Strip code imports
            case ts.isImportDeclaration(node) &&
              node.getText(source).includes('./'):

            // Strip exports
            case node.kind === ts.SyntaxKind.ExportKeyword:
              return undefined;

            default:
              return visitor(node);
          }
        },
        context,
      );
    };

    return ts.visitNode(parent, visitor);
  };

  const { transformed } = ts.transform(source, [transformer]);

  const printer = ts.createPrinter();

  return `// This file was auto-generated. DO NOT EDIT!
import * as r from 'type-safe-react-router';
${printer.printNode(ts.EmitHint.SourceFile, transformed[0], source)}
export const paths = r.makePaths(routes);
`;
};

try {
  await writeFile(TARGET, poorMansCodegenLOL(SRC));
  console.log('🎉 Yay');
} catch (err) {
  console.log(`😱 Nope: ${err.message}`);
  process.exit(1);
}
