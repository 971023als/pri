import sys
import json
import pandas as pd

def evaluate_policy(input_file, output_format="json"):
    try:
        # 데이터 로드
        if input_file.endswith(".json"):
            with open(input_file, "r", encoding="utf-8") as f:
                data = json.load(f)
        elif input_file.endswith(".csv"):
            data = pd.read_csv(input_file).to_dict(orient="records")[0]
        else:
            raise ValueError("Input file must be .json or .csv")

        # 평가 기준
        required_sections = ["수집하는 개인정보 항목", "개인정보의 이용 목적", "개인정보의 보유 및 이용 기간"]
        policy_text = data.get("content", "")
        results = {}

        for section in required_sections:
            results[section] = "포함됨" if section in policy_text else "누락됨"

        # 결과 저장
        evaluation_data = {
            "url": data.get("url", ""),
            "evaluation": results,
            "timestamp": data.get("timestamp", "")
        }

        if output_format == "json":
            with open("data/evaluation.json", "w", encoding="utf-8") as f:
                json.dump(evaluation_data, f, ensure_ascii=False, indent=4)
            print("Evaluation saved as JSON: data/evaluation.json")
        elif output_format == "csv":
            df = pd.DataFrame([evaluation_data])
            df.to_csv("data/evaluation.csv", index=False, encoding="utf-8-sig")
            print("Evaluation saved as CSV: data/evaluation.csv")

    except Exception as e:
        print(f"Error during evaluation: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python policy_evaluator.py --input <file> --output-format <json|csv>")
        sys.exit(1)

    args = sys.argv[1:]
    input_file = args[args.index("--input") + 1]
    output_format = args[args.index("--output-format") + 1]
    evaluate_policy(input_file, output_format)
