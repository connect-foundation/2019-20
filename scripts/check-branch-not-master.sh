#!/bin/bash
# pre commit check 용 스크립트 파일 
set -e

# 현재 브랜치명이 master이거나, master를 포함하면 안됨
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p' )

if [[ "$branch" =~ master$ ]]
then
    echo ERROR: Dont commit to [ $branch ] branch
    exit 1
fi
