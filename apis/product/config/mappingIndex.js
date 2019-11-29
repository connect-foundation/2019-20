// 세팅 및 매핑
PUT products
{
  "settings": {
  "analysis": {
    "analyzer": {
      "nori_discard": {
        "tokenizer": "nori_t_discard",
          "filter": "my_shingle"
      }
    },
    "tokenizer": {
      "nori_t_discard": {
        "type": "nori_tokenizer",
          "decompound_mode": "discard"
      }
    },
    "filter": {
      "my_shingle": {
        "type": "shingle",
          "token_separator": "",
          "max_shingle_size": 3
      }
    }
  }
},
  "mappings": {
  "properties": {
    "title": {
      "type": "text",
        "fields": {
        "nori_discard": {
          "type": "text",
            "analyzer": "nori_discard",
            "search_analyzer": "standard"
        }
      }
    }
  }
}
}



//검색 쿼리
GET products/_search
{
  "query": {
  "bool": {
    "should": [
      {
        "match":{
          "title": "갤럭시 S10 팝니다. 가개통X 선택약정 가능. 확정기변 가능"
        }
      },
      {
        "term":{
          "title.nori": "갤럭시S7"
        }
      }
    ]
  }
}
}
