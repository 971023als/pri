# 개인정보 처리방침 평가 스크립트

이 프로젝트는 개인정보 처리방침을 자동으로 크롤링하고, 필수 항목의 존재 여부 및 내용의 적합성을 평가하여 HTML, Word, Excel, CSV 또는 JSON 형식으로 보고서를 생성하는 스크립트입니다. 크롤링부터 평가, 보고서 생성까지 한 번에 처리할 수 있도록 설계되었습니다.

---

## 주요 기능
1. **개인정보 처리방침 크롤링**:
   - Python과 Selenium을 사용하여 웹사이트에서 개인정보 처리방침을 자동 수집.
   - MySQL 데이터베이스 또는 로컬 CSV/JSON 파일에 데이터 저장.

2. **개인정보 처리방침 자동 분석**:
   - 법적 요구사항과 비교하여 필수 항목의 존재 여부 점검.
   - 텍스트 적합성 분석 및 권장 사항 제공.

3. **결과 보고서 생성**:
   - HTML, Word, Excel, CSV, JSON 형식의 평가 결과 보고서 생성.
   - 시각화된 평가 결과를 통해 개선 포인트 확인.

4. **사용자 친화적 인터페이스**:
   - 웹 기반 다운로드 기능 제공 (PHP 및 Apache 웹 서버 사용).

---

## 시스템 요구사항

- **Python**: 3.8 이상
- **Selenium WebDriver**: ChromeDriver 또는 다른 브라우저 드라이버
- **PHP**: 7.4 이상
- **MySQL**: 8.0 이상 (옵션)
- **Apache**: 2.4 이상
- **추가 라이브러리**:
  - `pandas`, `python-docx`, `openpyxl`, `selenium`, `beautifulsoup4`

---

## 설치 방법

### 1. 레포지토리 클론
```bash
git clone https://github.com/username/repo.git
cd repo
