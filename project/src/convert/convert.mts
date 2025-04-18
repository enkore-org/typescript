import ts from "typescript"
import type {MyTSImportDeclaration} from "#~src/types/node/MyTSImportDeclaration.mts"
import type {MyTSExportDeclaration} from "#~src/types/node/MyTSExportDeclaration.mts"
import type {MyTSFunctionDeclaration} from "#~src/types/node/MyTSFunctionDeclaration.mts"
import type {MyTSVariableDeclaration} from "#~src/types/node/MyTSVariableDeclaration.mts"
import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.mts"

import {convertImportDeclaration} from "./importDeclaration/index.mts"
import {convertExportDeclaration} from "./exportDeclaration/index.mts"
import {convertFunctionDeclaration} from "./functionDeclaration/index.mts"
import {convertVariableDeclaration} from "./variableDeclaration/index.mts"
import {convertTypeAliasDeclaration} from "./typeAliasDeclaration/index.mts"

function convert(node: ts.ImportDeclaration): MyTSImportDeclaration;
function convert(node: ts.ExportDeclaration): MyTSExportDeclaration;
function convert(node: ts.FunctionDeclaration): MyTSFunctionDeclaration;
function convert(node: ts.VariableDeclaration): MyTSVariableDeclaration;
function convert(node: ts.TypeAliasDeclaration): MyTSTypeAliasDeclaration;

function convert(
	node: ts.ImportDeclaration|ts.ExportDeclaration
): MyTSImportDeclaration|MyTSExportDeclaration;

function convert(node: ts.Node): unknown {
	if (ts.isImportDeclaration(node)) {
		return convertImportDeclaration(node)
	} else if (ts.isExportDeclaration(node)) {
		return convertExportDeclaration(node)
	} else if (ts.isFunctionDeclaration(node)) {
		return convertFunctionDeclaration(node)
	} else if (ts.isVariableDeclaration(node)) {
		return convertVariableDeclaration(node)
	} else if (ts.isTypeAliasDeclaration(node)) {
		return convertTypeAliasDeclaration(node)
	}

	const kind = ts.SyntaxKind[node.kind]

	throw new Error(
		`Cannot convert node of kind '${kind}'.`
	)
}

export {convert}
