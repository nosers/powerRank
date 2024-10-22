# 가이드 문서

---

## 개발 환경 설정
1. Node.js Install
[nvm-windows](https://github.com/coreybutler/nvm-windows/releases/latest)을 이용하여 Node.js를 설치합니다. (nvm-setup.exe 다운로드 및 설치)
```shell
$ nvm install 23.0.0  # 설치
$ nvm use 23.0.0      # 사용 버전 명시
```

2. npm module install
크롤링을 위한 puppeteer와 번들링을 위한 webpack 모듈 다운로드 (package.json)
```shell
$ npm install
```

---

## 개발 가이드
[puppeteer](https://pptr.dev/)의 공식 문서를 참고하십시오.

---

## 단일 실행 파일(exe) 생성
원문은 [링크](https://nodejs.org/api/single-executable-applications.html#single-executable-applications)를 참조하십시오. (원문에서는 webpack을 이용한 단일 파일로의 번들링 설명은 포함되지 않습니다.)

1. webpack을 이용하여 puppeteer-core를 포함하는 단일 파일로 번들링합니다.
```shell
$ npx webpack --config webpack.config.js --mode production
```
2. 주입할 blob을 생성합니다.
```shell
$ node --experimental-sea-config sea-config.json
```
3. node 실행 파일을 생성합니다.
```shell
$ node -e "require('fs').copyFileSync(process.execPath, 'hello.exe')"
```
4. node 실행 파일에 blob을 주입합니다.
```shell
npx postject hello.exe NODE_SEA_BLOB sea-prep.blob ^
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
```
5. 실행
```shell
./hello.exe
```

---

## 설명
  - 실행시 `keywards.txt` 파일이 반드시 실행 파일과 같은 폴더에 있어야합니다.
  - 작업 결과물은 capture 폴더에 저장됩니다.
  - 네이버의 검색 주소 변경  또는 화면 구조 변경에 따라 유지 보수가 필요할 수 있습니다.