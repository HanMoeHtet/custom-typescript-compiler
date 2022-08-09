const ts = require('typescript');
const path = require('path');
const { SRC_PATH } = require('./paths.config');

/**
 * @type {ts.TransformerFactory<ts.SourceFile>}
 */
const transformer = (context) => {
  return (sourceFile) => {
    /**
     * @returns {ts.Node}
     */
    const visitor = (/** @type {ts.Node} */ node) => {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const moduleSpecifier = node.moduleSpecifier.text;

        if (moduleSpecifier.startsWith('@src/')) {
          const resolvedRelativePath = path.relative(
            path.dirname(sourceFile.fileName),
            SRC_PATH
          );
          const resolvedModuleSpecifier = moduleSpecifier.replace(
            /^@src/,
            resolvedRelativePath === '' ? '.' : resolvedRelativePath
          );

          return context.factory.updateImportDeclaration(
            node,
            node.decorators,
            node.modifiers,
            node.importClause,
            context.factory.createStringLiteral(resolvedModuleSpecifier),
            node.assertClause
          );
        }
      }

      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword
      ) {
        const moduleSpecifier = node.arguments[0].text;

        if (moduleSpecifier.startsWith('@src/')) {
          const resolvedRelativePath = path.relative(
            path.dirname(sourceFile.fileName),
            SRC_PATH
          );
          const resolvedModuleSpecifier = moduleSpecifier.replace(
            /^@src/,
            resolvedRelativePath === '' ? '.' : resolvedRelativePath
          );

          return context.factory.updateCallExpression(
            node,
            node.expression,
            node.typeArguments,
            [
              context.factory.createStringLiteral(resolvedModuleSpecifier),
              ...node.arguments.slice(1),
            ]
          );
        }
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

module.exports = {
  transformer,
};
