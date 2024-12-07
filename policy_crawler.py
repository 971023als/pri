import sys
import time
import json
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

def crawl_policy(url, output_format="json"):
    try:
        # ChromeDriver 설정
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # 브라우저 창 숨기기
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        service = Service("chromedriver")  # ChromeDriver 경로
        driver = webdriver.Chrome(service=service, options=chrome_options)

        # URL 접속
        driver.get(url)
        time.sleep(2)  # 페이지 로드 대기

        # 개인정보 처리방침 찾기
        try:
            policy_element = driver.find_element(By.TAG_NAME, "body")
            policy_text = policy_element.text
        except Exception as e:
            print(f"Error finding policy: {e}")
            policy_text = ""

        # 크롤링 데이터 저장
        data = {
            "url": url,
            "content": policy_text,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        if output_format == "json":
            with open("data/policy.json", "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print("Policy saved as JSON: data/policy.json")
        elif output_format == "csv":
            df = pd.DataFrame([data])
            df.to_csv("data/policy.csv", index=False, encoding="utf-8-sig")
            print("Policy saved as CSV: data/policy.csv")

        driver.quit()

    except Exception as e:
        print(f"Error during crawling: {e}")
        if 'driver' in locals():
            driver.quit()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python policy_crawler.py --url <URL> --output-format <json|csv>")
        sys.exit(1)

    args = sys.argv[1:]
    url = args[args.index("--url") + 1]
    output_format = args[args.index("--output-format") + 1]
    crawl_policy(url, output_format)