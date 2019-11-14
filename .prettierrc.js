// prettier 은 기본적으로 .editorconfig 파일을 고려합니다. .prettierrc.js 에서 editorconfig : true로 제어가능
module.exports = {
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true, // JSX에서 singleQuote or doubleQuote
	endOfLine: 'lf',
	trailingComma: 'all', // comma 항상 붙이기
	bracketSpacing: false, // 객체리터럴에서 { } 사이에 공백을 넣을 것인지
	jsxBracketSameLine: false, // 여러줄의 JSX 요소가 있을때, > 를 마지막 줄의 끝부분에서 닫을 것인지
	arrowParens: 'always', // (x) => x : always | x => x : avoid
};
