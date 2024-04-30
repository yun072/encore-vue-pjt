 #베이스 이미지 지정
#FROM node:latest

#클라우드 환경에서의 디렉토리를 의미
#WORKDIR /json-server

# 현재 디렉토리에 있는 모든 파일을 WORKDIR로 이동
#COPY package.json .
#COPY . . 


# 필요한 의존관계 라이브러리를 설치 명령어
#RUN npm install
#RUN npm i axios
#RUN npm install vuex@next --save



# 포트번호 노출
# EXPOSE 사용자 사용 포트번호:도커 내부 포트번호
# EXPOSE 7777:8080 
#EXPOSE 8080 

# 스크립트 실행 명령어
# 스크립트 언어라 npm run serve가 안 먹힘
#CMD ["npm", "run", "serve"]



# git-action version
# build
#FROM node: latest AS build
FROM node:alpine AS build
WORKDIR /frontapp
COPY . .
RUN npm install
RUN npm run build

# production
FROM node:alpine AS production
WORKDIR /frontapp
COPY --from=build /frontapp /frontapp
CMD ["npm", "run", "serve"]



