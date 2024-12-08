#!/bin/bash

# 사용자로부터 파일 경로 입력받기
echo "분석할 개인정보처리방침 파일의 경로를 입력하세요:"
read filepath

# 파일 존재 여부 확인
if [ ! -f "$filepath" ]; then
    echo "파일을 찾을 수 없습니다: $filepath"
    exit 1
fi

# 제7조 정보 추출
echo "제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)"
echo "========================================"

# 제7조의 내용을 출력
awk '/제7조\(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항\)/,/제8조/' "$filepath" | grep -v "제8조"

echo "========================================"
