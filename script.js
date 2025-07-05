// 로또 번호 생성기 JavaScript
class LottoGenerator {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('lottoHistory')) || [];
        this.totalCount = parseInt(localStorage.getItem('totalCount')) || 0;
        this.isGenerating = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
        this.updateHistory();
        this.updateLuckyLevel();
    }
    
    initializeElements() {
        this.generateBtn = document.getElementById('generateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.balls = document.querySelectorAll('.lotto-ball:not(.bonus-ball)');
        this.bonusBall = document.getElementById('bonus-ball');
        this.totalCountElement = document.getElementById('totalCount');
        this.luckyLevelElement = document.getElementById('luckyLevel');
        this.historyList = document.getElementById('historyList');
        this.lottoMachine = document.querySelector('.lotto-machine');
    }
    
    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateNumbers());
        this.resetBtn.addEventListener('click', () => this.resetNumbers());
        
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                if (!this.isGenerating) {
                    this.generateNumbers();
                }
            }
        });
    }
    
    generateNumbers() {
        if (this.isGenerating) return;
        
        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.lottoMachine.classList.add('generating');
        
        // 생성 중 효과
        this.showGeneratingEffect();
        
        // 번호 생성 애니메이션
        setTimeout(() => {
            const numbers = this.generateLottoNumbers();
            this.displayNumbers(numbers);
            this.saveToHistory(numbers);
            this.updateStats();
            this.updateHistory();
            
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.lottoMachine.classList.remove('generating');
        }, 3000);
    }
    
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
        
        // 보너스 번호 생성 (기본 번호와 중복되지 않게)
        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (numbers.includes(bonusNumber));
        
        return {
            main: numbers,
            bonus: bonusNumber
        };
    }
    
    showGeneratingEffect() {
        // 번호 생성 중 랜덤 숫자 표시
        const interval = setInterval(() => {
            if (!this.isGenerating) {
                clearInterval(interval);
                return;
            }
            
            this.balls.forEach(ball => {
                const randomNum = Math.floor(Math.random() * 45) + 1;
                ball.querySelector('.number').textContent = randomNum;
                ball.classList.add('bounce');
                setTimeout(() => ball.classList.remove('bounce'), 300);
            });
            
            const bonusRandomNum = Math.floor(Math.random() * 45) + 1;
            this.bonusBall.querySelector('.number').textContent = bonusRandomNum;
            this.bonusBall.classList.add('bounce');
            setTimeout(() => this.bonusBall.classList.remove('bounce'), 300);
        }, 200);
    }
    
    displayNumbers(numbers) {
        // 메인 번호 표시
        numbers.main.forEach((num, index) => {
            setTimeout(() => {
                const ball = this.balls[index];
                ball.querySelector('.number').textContent = num;
                ball.classList.add('fade-in-up');
                
                // 번호에 따른 색상 변경
                this.setBallColor(ball, num);
                
                // 효과음 시뮬레이션 (시각적 효과)
                ball.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    ball.style.transform = 'scale(1)';
                    ball.classList.remove('fade-in-up');
                }, 500);
            }, index * 300);
        });
        
        // 보너스 번호 표시
        setTimeout(() => {
            this.bonusBall.querySelector('.number').textContent = numbers.bonus;
            this.bonusBall.classList.add('fade-in-up');
            this.bonusBall.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.bonusBall.style.transform = 'scale(1)';
                this.bonusBall.classList.remove('fade-in-up');
            }, 500);
        }, 6 * 300);
    }
    
    setBallColor(ball, number) {
        // 번호 범위에 따른 색상 설정
        if (number <= 10) {
            ball.style.background = 'linear-gradient(145deg, #ff6b6b, #ee5a52)';
        } else if (number <= 20) {
            ball.style.background = 'linear-gradient(145deg, #4ecdc4, #44a08d)';
        } else if (number <= 30) {
            ball.style.background = 'linear-gradient(145deg, #45b7d1, #3498db)';
        } else if (number <= 40) {
            ball.style.background = 'linear-gradient(145deg, #f39c12, #e67e22)';
        } else {
            ball.style.background = 'linear-gradient(145deg, #9b59b6, #8e44ad)';
        }
    }
    
    resetNumbers() {
        this.balls.forEach(ball => {
            ball.querySelector('.number').textContent = '?';
            ball.style.background = '';
            ball.classList.add('spin');
            setTimeout(() => ball.classList.remove('spin'), 1000);
        });
        
        this.bonusBall.querySelector('.number').textContent = '?';
        this.bonusBall.classList.add('spin');
        setTimeout(() => this.bonusBall.classList.remove('spin'), 1000);
    }
    
    saveToHistory(numbers) {
        const historyItem = {
            id: Date.now(),
            main: numbers.main,
            bonus: numbers.bonus,
            date: new Date().toLocaleString('ko-KR')
        };
        
        this.history.unshift(historyItem);
        
        // 최대 10개까지만 저장
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        
        this.totalCount++;
        
        localStorage.setItem('lottoHistory', JSON.stringify(this.history));
        localStorage.setItem('totalCount', this.totalCount.toString());
    }
    
    updateStats() {
        this.totalCountElement.textContent = this.totalCount;
    }
    
    updateHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p class="no-history">아직 뽑은 번호가 없습니다.</p>';
            return;
        }
        
        const historyHTML = this.history.map(item => `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-numbers">
                        ${item.main.map(num => `<span class="history-number">${num}</span>`).join('')}
                        <span class="history-number history-bonus">${item.bonus}</span>
                    </div>
                    <div class="history-date">${item.date}</div>
                </div>
            </div>
        `).join('');
        
        this.historyList.innerHTML = historyHTML;
    }
    
    updateLuckyLevel() {
        const levels = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
        const randomLevel = levels[Math.floor(Math.random() * levels.length)];
        this.luckyLevelElement.textContent = randomLevel;
        
        // 매시간마다 행운 레벨 업데이트
        setInterval(() => {
            const newLevel = levels[Math.floor(Math.random() * levels.length)];
            this.luckyLevelElement.textContent = newLevel;
        }, 3600000); // 1시간
    }
    
    // 특별한 날짜 체크 (크리스마스, 신정 등)
    checkSpecialDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        
        const specialDates = {
            '1-1': '🎊 새해 복 많이 받으세요!',
            '12-25': '🎄 메리 크리스마스!',
            '2-14': '💝 발렌타인데이!',
            '10-31': '🎃 할로윈!',
            '12-31': '🎆 한 해의 마지막 날!'
        };
        
        const dateKey = `${month}-${date}`;
        if (specialDates[dateKey]) {
            this.showSpecialMessage(specialDates[dateKey]);
        }
    }
    
    showSpecialMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'special-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => messageDiv.remove(), 500);
        }, 3000);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    const lottoGenerator = new LottoGenerator();
    
    // 특별한 날짜 체크
    lottoGenerator.checkSpecialDate();
    
    // 페이지 로드 애니메이션
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.container').style.transition = 'all 0.8s ease-out';
        document.querySelector('.container').style.opacity = '1';
        document.querySelector('.container').style.transform = 'translateY(0)';
    }, 100);
});

// 추가 CSS 애니메이션 (동적 추가)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .history-date {
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
    }
    
    .special-message {
        font-weight: 600;
        font-size: 1rem;
    }
`;
document.head.appendChild(style); 