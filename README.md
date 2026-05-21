# 일본어 동사 퀴즈

그림과 함께 일본어 동사 활용을 연습하는 정적 웹 퀴즈입니다.

라이브: https://euidong.github.io/japanese_study/

## 동작 방식

- 시작 화면에서 문항 수를 15 / 30 / 45 중 고른다.
- 매 문제는 그림과 함께 (기본형 / 마스형 / 뜻) 중 두 가지를 힌트로 보여주고, 나머지 하나를 4지선다로 묻는다.
- 오답 보기는 가능한 한 같은 그룹(1·2·3그룹)에서 뽑아 학습 효과를 높인다.
- 마지막 문제 후 점수와 틀린 문제 목록을 보여준다.

## 파일 구조

| 파일 | 설명 |
| --- | --- |
| `index.html` | 단일 페이지, 세 화면(시작/문제/결과)을 토글 |
| `styles.css` | 모바일 우선 스타일 |
| `app.js` | 셔플·문제 생성·채점 로직 |
| `data.js` | 45개 동사 데이터 (`window.VERBS`) |
| `images/verb_NN.png` | 동사별 그림 |
| `docs/specs/` | 디자인 스펙 |

## 로컬에서 실행

별도 빌드 단계 없이 정적 서버로 띄우면 된다.

```sh
python3 -m http.server 8000
# → http://localhost:8000/
```

## 배포

`main` 브랜치 root에서 GitHub Pages가 서빙한다.
Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)`.
