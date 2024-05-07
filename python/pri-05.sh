#!/bin/bash

# 사용자로부터 파일 경로 입력받기
echo "분석할 개인정보처리방침 파일의 경로를 입력하세요:"
read filepath

# 파일 존재 여부 확인
if [ ! -f "$filepath" ]; then
    echo "파일을 찾을 수 없습니다: $filepath"
    exit 1
fi

# 제5조 정보 추출
echo "제5조(개인정보의 파기절차 및 파기방법)"
echo "========================================"

# 제5조의 내용을 출력
awk '/제5조\(개인정보의 파기절차 및 파기방법\)/,/제6조/' "$filepath" | grep -v "제6조"

echo "========================================"