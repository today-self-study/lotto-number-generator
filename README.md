# 🎱 로또 번호 생성기

실제 로또 추첨 같은 애니메이션과 함께 행운의 번호를 생성하는 웹 애플리케이션입니다.

## 🌟 주요 기능

### 🎲 로또 번호 생성
- 1~45 범위에서 6개의 중복되지 않는 번호 생성
- 보너스 번호 자동 생성
- 실제 로또 추첨 같은 애니메이션 효과

### 🎨 인터랙티브 디자인
- 로또 공 모양의 3D 디자인
- 번호 범위별 색상 구분
- 부드러운 애니메이션과 전환 효과
- 반응형 디자인 (모바일 최적화)

### 📊 통계 및 히스토리
- 총 뽑기 횟수 추적
- 최근 10개 번호 히스토리
- 오늘의 행운 레벨 표시
- 로컬 스토리지를 통한 데이터 저장

### 🎉 특별 기능
- 특별한 날짜 알림 (크리스마스, 신정 등)
- 키보드 단축키 지원 (Space/Enter)
- 로딩 애니메이션 및 시각적 피드백

## 🚀 라이브 데모

GitHub Pages를 통해 배포된 사이트를 확인해보세요:

**🔗 [로또 번호 생성기 바로가기](https://today-self-study.github.io/lotto-number-generator/)**

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **스타일링**: CSS Grid, Flexbox, CSS Animations
- **저장소**: Local Storage
- **배포**: GitHub Pages

## 📱 반응형 디자인

- **데스크톱**: 최적화된 대형 화면 레이아웃
- **태블릿**: 중간 크기 화면에 맞춘 조정
- **모바일**: 터치 친화적인 소형 화면 레이아웃

## 🎯 사용법

1. **번호 뽑기**: "번호 뽑기" 버튼을 클릭하거나 Space/Enter 키를 누르세요
2. **애니메이션 감상**: 3초간 진행되는 로또 추첨 애니메이션을 즐기세요
3. **결과 확인**: 생성된 6개의 메인 번호와 1개의 보너스 번호를 확인하세요
4. **히스토리 확인**: 최근 뽑은 번호들을 히스토리에서 확인할 수 있습니다
5. **다시 뽑기**: "다시 뽑기" 버튼으로 번호를 초기화할 수 있습니다

## 🎨 디자인 특징

### 색상 시스템
- **1~10번**: 빨간색 계열
- **11~20번**: 청록색 계열
- **21~30번**: 파란색 계열
- **31~40번**: 주황색 계열
- **41~45번**: 보라색 계열
- **보너스**: 황금색 계열

### 애니메이션 효과
- 로또 공 회전 애니메이션
- 번호 생성 중 깜빡임 효과
- 결과 표시 시 페이드인 효과
- 호버 시 3D 효과

## 🔧 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/today-self-study/lotto-number-generator.git

# 프로젝트 디렉토리로 이동
cd lotto-number-generator

# 로컬 서버 실행 (Python 3 사용 예시)
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

## 📁 프로젝트 구조

```
lotto-number-generator/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
└── README.md           # 프로젝트 문서
```

## 🎯 핵심 기능 구현

### 로또 번호 생성 알고리즘
```javascript
generateLottoNumbers() {
    const numbers = [];
    
    // 1-45 범위에서 6개의 중복되지 않는 번호 생성
    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    
    // 오름차순 정렬
    numbers.sort((a, b) => a - b);
    
    // 보너스 번호 생성
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.includes(bonusNumber));
    
    return { main: numbers, bonus: bonusNumber };
}
```

## 🌟 특별 기능

### 데이터 저장
- 로컬 스토리지를 통한 히스토리 저장
- 총 뽑기 횟수 추적
- 브라우저 종료 후에도 데이터 유지

### 접근성
- 키보드 내비게이션 지원
- 반응형 디자인으로 모든 디바이스 지원
- 시각적 피드백 제공

## 📊 브라우저 지원

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/new-feature`)
3. 변경사항을 커밋하세요 (`git commit -am 'Add new feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/new-feature`)
5. Pull Request를 생성하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## ⚠️ 면책 조항

이 사이트는 오락용으로 제작되었으며, 실제 로또 당첨을 보장하지 않습니다. 
책임감 있는 게임 플레이를 권장합니다.

## 📞 연락처

프로젝트에 대한 질문이나 제안사항이 있으시면 GitHub Issues를 통해 연락해주세요.

---

**🍀 행운을 빕니다! 🍀**