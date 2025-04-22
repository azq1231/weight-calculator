// 等待 DOM 完全加載
document.addEventListener('DOMContentLoaded', function() {
    const countButtons = document.querySelectorAll('.count-btn');
    let selectedCount = null;

    // 計算函數
    function calculate() {
        // 獲取輸入值
        const totalWeight = parseFloat(document.getElementById('total-weight').value);
        
        // 獲取結果顯示區域
        const resultDiv = document.getElementById('result');
        const processDiv = document.getElementById('process');

        // 清除之前的結果
        processDiv.innerHTML = '';
        processDiv.style.display = 'block';
        
        // 驗證輸入
        if (isNaN(totalWeight) || totalWeight <= 0 || selectedCount === null) {
            resultDiv.textContent = '請輸入有效的總重量並選擇數量';
            return;
        }

        // 計算單一重量
        const singleWeight = totalWeight / selectedCount;
        resultDiv.textContent = `單次減重: ${singleWeight.toFixed(2)}`;

        // 創建結果按鈕容器
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'result-buttons';
        
        // 顯示每次減重後的結果
        let currentWeight = totalWeight;
        for (let i = 0; i < selectedCount; i++) {
            const button = document.createElement('button');
            button.className = 'result-btn';
            button.textContent = currentWeight.toFixed(2);
            buttonsContainer.appendChild(button);
            currentWeight = Math.max(0, currentWeight - singleWeight);
        }
        processDiv.appendChild(buttonsContainer);
    }

    // 為數量按鈕添加點擊事件
    countButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按鈕的 active 類
            countButtons.forEach(btn => btn.classList.remove('active'));
            // 為當前按鈕添加 active 類
            this.classList.add('active');
            // 保存選擇的數量
            selectedCount = parseInt(this.dataset.count);
            // 自動計算
            calculate();
        });
    });

    // 為總重量輸入框添加輸入事件
    document.getElementById('total-weight').addEventListener('input', function() {
        if (selectedCount !== null) {
            calculate();
        }
    });
}); 