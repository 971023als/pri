#!/bin/bash

# 파일 경로 인자로 받기
if [ "$#" -ne 1 ]; then
    echo "사용법: $0 <파일 경로>"
    exit 1
fi

filepath="$1"

# 파일 존재 여부 확인
if [ ! -f "$filepath" ]; then
    echo "파일을 찾을 수 없습니다: $filepath"
    exit 1
fi

# 제4조와 관련된 내용 추출 및 출력
echo "제4조(개인정보의 제3자 제공에 관한 사항):"
echo "----------------------------------------"

# 개인정보 파일명 추출
echo "개인정보 파일명:"
grep -A 4 "개인정보 파일명:" $filepath | sed -n '1p'

# 제공받는 자 추출
echo "제공받는 자:"
grep -A 4 "개인정보 파일명:" $filepath | grep "제공받는자:" | cut -d ':' -f2-

# 제공 목적 추출
echo "제공 목적:"
grep -A 4 "개인정보 파일명:" $filepath | grep "제공 목적:" | cut -d ':' -f2-

# 제공하는 항목 추출
echo "제공하는 항목:"
grep -A 4 "개인정보 파일명:" $filepath | grep "제공하는 항목:" | cut -d ':' -f2-

# 보유기간 추출
echo "보유기간(관련 근거):"
grep -A 4 "개인정보 파일명:" $filepath | grep "보유기간" | cut -d ':' -f2-

echo "----------------------------------------"
