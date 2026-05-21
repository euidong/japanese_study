// 동사 데이터 — 원본 학습 자료(45장 그림)와 일치.
// group: 1 = 一段(る탈락), 2 = 五段(う→い), 3 = 不規則
//
// 분류 메모
// - 14 かえる, 17 おこる, 21 はしる, 24 はいる: -eru/-iru로 끝나지만 五段 동사(예외)
// - 6 ける: 보통 ichidan으로 알지만 일본어에서 五段 동사로 분류됨
// - 39 きる(着る, 입다): 그림이 윗옷을 입는 모습 → 一段
// - 44 きる(切る, 자르다): 그림이 칼로 자르는 모습 → 五段
// - 25 とる(撮る, 사진 찍다): 그림이 카메라 → "찍습니다"로 표기
window.VERBS = [
  { num:  1, dict: "かく",     masu: "かきます",     meaning: "씁니다",       group: 2 },
  { num:  2, dict: "みる",     masu: "みます",       meaning: "봅니다",       group: 1 },
  { num:  3, dict: "あう",     masu: "あいます",     meaning: "만납니다",     group: 2 },
  { num:  4, dict: "はなす",   masu: "はなします",   meaning: "이야기합니다", group: 2 },
  { num:  5, dict: "きく",     masu: "ききます",     meaning: "듣습니다",     group: 2 },
  { num:  6, dict: "ける",     masu: "けります",     meaning: "찹니다",       group: 2 },
  { num:  7, dict: "つくる",   masu: "つくります",   meaning: "만듭니다",     group: 2 },
  { num:  8, dict: "なく",     masu: "なきます",     meaning: "웁니다",       group: 2 },
  { num:  9, dict: "いく",     masu: "いきます",     meaning: "갑니다",       group: 2 },
  { num: 10, dict: "のむ",     masu: "のみます",     meaning: "마십니다",     group: 2 },
  { num: 11, dict: "たべる",   masu: "たべます",     meaning: "먹습니다",     group: 1 },
  { num: 12, dict: "あるく",   masu: "あるきます",   meaning: "걷습니다",     group: 2 },
  { num: 13, dict: "さがす",   masu: "さがします",   meaning: "찾습니다",     group: 2 },
  { num: 14, dict: "かえる",   masu: "かえります",   meaning: "돌아갑니다",   group: 2 },
  { num: 15, dict: "まつ",     masu: "まちます",     meaning: "기다립니다",   group: 2 },
  { num: 16, dict: "わらう",   masu: "わらいます",   meaning: "웃습니다",     group: 2 },
  { num: 17, dict: "おこる",   masu: "おこります",   meaning: "화냅니다",     group: 2 },
  { num: 18, dict: "ねる",     masu: "ねます",       meaning: "잡니다",       group: 1 },
  { num: 19, dict: "おきる",   masu: "おきます",     meaning: "일어납니다",   group: 1 },
  { num: 20, dict: "よむ",     masu: "よみます",     meaning: "읽습니다",     group: 2 },
  { num: 21, dict: "はしる",   masu: "はしります",   meaning: "달립니다",     group: 2 },
  { num: 22, dict: "うたう",   masu: "うたいます",   meaning: "노래합니다",   group: 2 },
  { num: 23, dict: "くる",     masu: "きます",       meaning: "옵니다",       group: 3 },
  { num: 24, dict: "はいる",   masu: "はいります",   meaning: "들어갑니다",   group: 2 },
  { num: 25, dict: "とる",     masu: "とります",     meaning: "찍습니다",     group: 2 },
  { num: 26, dict: "あらう",   masu: "あらいます",   meaning: "씻습니다",     group: 2 },
  { num: 27, dict: "する",     masu: "します",       meaning: "합니다",       group: 3 },
  { num: 28, dict: "かう",     masu: "かいます",     meaning: "삽니다",       group: 2 },
  { num: 29, dict: "およぐ",   masu: "およぎます",   meaning: "수영합니다",   group: 2 },
  { num: 30, dict: "みがく",   masu: "みがきます",   meaning: "닦습니다",     group: 2 },
  { num: 31, dict: "すう",     masu: "すいます",     meaning: "피웁니다",     group: 2 },
  { num: 32, dict: "おどる",   masu: "おどります",   meaning: "춤춥니다",     group: 2 },
  { num: 33, dict: "あける",   masu: "あけます",     meaning: "엽니다",       group: 1 },
  { num: 34, dict: "しめる",   masu: "しめます",     meaning: "닫습니다",     group: 1 },
  { num: 35, dict: "いれる",   masu: "いれます",     meaning: "넣습니다",     group: 1 },
  { num: 36, dict: "だす",     masu: "だします",     meaning: "내놓습니다",   group: 2 },
  { num: 37, dict: "たつ",     masu: "たちます",     meaning: "일어섭니다",   group: 2 },
  { num: 38, dict: "すわる",   masu: "すわります",   meaning: "앉습니다",     group: 2 },
  { num: 39, dict: "きる",     masu: "きます",       meaning: "입습니다",     group: 1 },
  { num: 40, dict: "ぬぐ",     masu: "ぬぎます",     meaning: "벗습니다",     group: 2 },
  { num: 41, dict: "はく",     masu: "はきます",     meaning: "(바지/신발을) 신습니다", group: 2 },
  { num: 42, dict: "かぶる",   masu: "かぶります",   meaning: "(모자를) 씁니다", group: 2 },
  { num: 43, dict: "あそぶ",   masu: "あそびます",   meaning: "놉니다",       group: 2 },
  { num: 44, dict: "きる",     masu: "きります",     meaning: "자릅니다",     group: 2 },
  { num: 45, dict: "やく",     masu: "やきます",     meaning: "굽습니다",     group: 2 },
];

window.VERBS.forEach(v => { v.image = `images/verb_${String(v.num).padStart(2, "0")}.png`; });
