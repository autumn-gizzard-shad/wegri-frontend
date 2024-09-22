# 🐟가을전어 - 위그리

## 서비스 요약
<div align="center">
  <img src="https://github.com/user-attachments/assets/cce902dc-c6c3-4c1d-9996-b3b931d112e2" width="200px" height = "200px" />
  <h2>  
     대구 지역 구성원이 시내 환경 문제를 함께 해결할 수 있는 공간
  </h2>
</div>
<br/>

## 주제 구분
### S타입
대구 시내의 환경 문제를 해결하고 지속가능한 발전을 지원하는 서비스

## 팀원 소개
### 가을전어

<br/>
<table>
  <tr>
    <td><a href="https://github.com/Apoliasm">신영재</td>
    <td><a href="https://github.com/minguk-cucu">김민국</td>
    <td><a href="https://github.com/Lucerna00">박준석</td>
    <td><a href="https://github.com/wjdfo">조정래</td>
  </tr>
  <tr>
    <td>컴퓨터학부</td>
    <td>컴퓨터학부</td>
    <td>컴퓨터학부</td>
    <td>아동학부</td>
  </tr>
  <tr>
    <td>팀장, 프론트엔드</td>
    <td>프론트엔드</td>
    <td>백엔드</td>
    <td>백엔드</td>
  </tr>
  <tr>
   <td>
      <img style="border: 0px solid black !important; border-radius:50%;" src="https://github.com/user-attachments/assets/94455ebe-3453-427b-a6dc-9ab508a8dccb" width="150px" height = "150px" />
   </td>
    <td>
      <img style="border: 0px solid black !important; border-radius:50%;" src="https://github.com/user-attachments/assets/88340cb7-2c1d-4492-a09d-fc252aa5adb2" width="150px" height = "150px" />
   </td>
    <td>
      <img style="border: 0px solid black !important; border-radius:50%; " src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/e3837edf-b81f-4f38-ad58-3139d996caef" width="150px" height = "150px" />
   </td>
    <td>
      <img style="border: 0px solid black !important; border-radius:50%; " src="https://github.com/Apoliasm/2023_nov_hackathon/assets/113246980/e8c1beee-db7f-48ca-b8e3-c14f3493e414" width="150px" height = "150px" />
   </td>
  </tr>
</table>
<br/>

## 시연 영상
[Youtube](https://www.youtube.com/watch?v=wBYTkNxI1-8)

## 서비스 소개
### 서비스 개요
커뮤니티 매핑으로 대구 시내의 환경 문제를 해결할 수 있는 서비스

cf) 커뮤니티 매핑 : 집단지성에 기반하는 참여형 지도 제작

- 다양한 환경 문제들을 사진과 함께 위치 정보를 공유

- 공유 및 해결 시엔 소정의 리워드를 받게 되며, 리워드로 상품 구매 가능

- 새로운 주제로 커뮤니티 맵 컨텐츠 생성 가능

  참여도가 높은 순서대로 맵 강조

- 자전거 공유/대여 기능

  공유(대여 제공)를 하고 싶은 사용자는 자신의 자전거를 플랫폼에 등록하고 일정 리워드 수령
  
  사용을 원하는 사용자는 맵에 있는 자전거를 무료로 일정 시간 대여 가능

  공유/대여된 자전거의 경로 데이터는 추후 대구시 공공 자전거 마련에 큰 도움이 될 것으로 기대됨


### 타서비스와의 차별점

- 앱 스토어, 구글 플레이 스토어 등에 있는 커뮤니티 매핑 서비스의 경우, 환경과 관련된 주제가 아닌, 맛집, 카페, 명소 등의 정보만 제공하고 환경 문제와 관련된 정보는 제공하고 않음

  환경 관련 서비스들의 경우, 지도를 활용하지 않고 분리수거 팁, 오늘의 전력 소비량 등의 정보만 제공하며, 사용자들의 관심을 유도하기 어렵다는 문제가 있음

- 위그리 서비스의 경우, 환경 문제와 관련된 정보들을 사용자들이 파악하기 쉽도록 지도 정보를 제공하며 처음 이용하는 사용자들도 간단하게 이용할 수 있는 서비스를 제공함

- 사용자의 흥미를 유도할 수 있도록 리워드 정책을 적용하였으며, 사용자들은 이 리워드를 통해 간단한 상품이나 서비스를 소비할 수 있음

- 사용자 자신이 관심 있는 환경 문제를 직접 간편하게 지도를 만들어 핀포인트를 적용하여 다른 사용자들과 공유하도록 함
  
  특정 환경 문제에만 집중하지 않는 광범위 환경 커뮤니티 플랫폼 서비스를 제공함

### 구현 내용 및 결과물

### Front-End : https://github.com/autumn-gizzard-shad/wegri-frontend.git
### Back-End : https://github.com/autumn-gizzard-shad/wegri-backend.git
### Notion : https://eggplant-crocodile-022.notion.site/1021fa6ea16c804c86adcac6cdc2ddb5

1. 자전거 공유 서비스
    - 자신의 자전거를 공유하고 싶은 사용자가 지도에 핀포인트를 통해 등록
    - 자전거를 대여하고 싶은 사용자는 핀포인트를 통해 자전거 대여
    - 이후 자전거를 반납하면 새로운 핀포인트가 생성되며 다른 사용자들도 이용 가능

2. 환경 문제 공유 서비스
    - 사용자들은 관심 있는 환경 지도를 통해 지역 사회 내 환경 문제들 핀포인트를 통해 
    파악 가능
    - 환경 문제 발견 시, 관련된 환경 지도에 등록하여 다른 사용자들과 공유 가능
    - 관심 있는 환경 지도가 없을 경우, 자신의 관심사에 맞는 새로운 환경 지도 등록

3. 리워드 정책
    - 환경 문제 핀포인트 등록, 해결 시 리워드 지급
    - 자전거 등록 시, 리워드 지급
    - 리워드를 통해 상품, 서비스 소비 가능

4. 소셜 로그인 기능
    - 카카오 로그인 기능을 통해 간편한 로그인 가능



### 구현 방식

<img src="https://github.com/user-attachments/assets/e843dae9-637e-4ce3-9e08-ea1c1bd37c09" width="700px" height = "440px" />

- Front-End : React Framework, HTML, JS, CSS

- Back-End : Spring Boot Framework, Java

- Database : MySQL

- Infra : EC2, RDS, NGINX, GitHub Actions

- Cooperation : GitHub, Notion, Figma, Discord

## 향후 개선 혹은 발전 방안

- 현재 자전거 대여/공유 서비스만 제공하고 있지만, 향후 카풀 서비스 제공할 예정

  이동 경로가 겹치는 사용자들이 소정의 금액을 지불하고 카풀 서비스를 이용하며 환경 보호에 이바지할 수 있음

- 카카오 로그인만 있지만 추후엔 구글, 네이버 로그인을 추가하여 접근 편의성을 높일 계획
