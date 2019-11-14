# 프로젝트 디렉토리 구조

## 참조

- [Structure of a NodeJS API Project](https://medium.com/@gpp?source=post_page-----cdecb46ef3f8----------------------)
- [왜 비즈니스 로직은 Model(Domain)에 가까울수록 좋은가?]( https://nesoy.github.io/articles/2018-04/why-close-to-domain)

## 디렉토리 구조

- 디렉토리 구조는 "Structure of a NodeJS API Project"에서 설명한 구조가 적합하다고 생각되어 해당 구조를 따른다.

- ```
  .
  ├── config                  # App configuration files
  │   ├── sequalize.json        # Sequalize config
  │   ├── serviceOne.json       # ServiceOne config
  │   └── ...                 # Other configurations
  ├── routes                  
  │   ├── controllers         # Request managers
  │   ├── middlewares         # Request middlewares
  │   └── routes.ts           # Define routes and middlewares here
  ├── services                # External services implementation   
  │   ├── serviceOne
  │   └── serviceTwo
  │   └── ...                 # Other services
  ├── db                      # Data access stuff  (Sequalize mostly)
  │   ├── models              # Models
  │   ├── migrations          # Migrations
  │   ├── seeds               # Seeds
  │   └── index.js            # Sequalize instantiation
  ├── core                    # Business logic implementation
  │   ├── accounts.js         
  │   ├── chat.js            
  │   └── ...                 # Other business logic implementations
  ├── utils                   # Util libs (formats, validation, etc)
  ├── tests                   # Testing
  ├── scripts                 # Standalone scripts for dev uses
  ├── pm2.js                  # pm2 init
  ├── package.json            # 모든 서비스마다 하나의 package.json 생성
  ├── README.md         	    # 모든 서비스마다 하나의 readme 생성
  └── app.ts         		    # App starting point
  ```

  - 같은 계층에 있는 폴더/파일은 같은 책임을 갖는다고 생각한다.
  - 카테고리 별로 분류되었다고 생각하였기 때문에 선택(best practice라 생각함)
    - 컨트롤러, 미들웨어는 라우터에서의 한 부분이라 판단
  - service
    - 외부 네트워크와 통신하기 위한 도구 모음
  - core (계층형 패턴을 따름)
    - model에 접근하기 위한 기능 모음
    - service에서 model 에 대한 처리의 복잡도를 낮추기 위함
  - util
    - 범용적으로 사용가능한 도구(date, checker, 암호화......)