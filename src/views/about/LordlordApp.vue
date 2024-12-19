<template>
  <AboutNavbar />
  <div class="main-container">
    <div class="section mission">
      <div class="mission-text">
        Our mission is to bridge the gap between landlords and tenants, making
        renting and managing properties easy.
      </div>
      <div class="download-links flex flex-row items-center gap-x-5">
        <a
          href="https://apps.apple.com/us/app/habeep/id6450388013"
          target="_blank"
          class="download-link no-underline"
        >
          <img
            src="../../assets/icons/download-app-apple.svg"
            alt=""
            class="download-icon"
          />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=org.habeep"
          target="_blank"
          class="download-link no-underline"
        >
          <img
            src="../../assets/icons/download-app-google.svg"
            alt=""
            class="download-icon"
          />
        </a>
      </div>
    </div>

    <div class="section landlord">
      <img src="../../assets/landlord/Frame.png" alt="" />
      <div class="landlord-container">
        <p class="section-title">Why Become a Habeep Landlord</p>
        <img src="../../assets/landlord/phone.png" alt="" />
        <div class="benefit-item">
          <div class="benefit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="icon"
            >
              <path
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div class="benefit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="icon"
            >
              <path
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div class="benefit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="icon"
            >
              <path
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div class="benefit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="icon"
            >
              <path
                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25
             25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71
              71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 
              489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 
              27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
              />
            </svg>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AboutNavbar from "../../components/AboutNavbar.vue";
</script>

<style>
.main-container {
  max-width: 1440px;
  margin: 0 auto;
  /* padding: 0 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.mission {
  max-width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}

.mission-text {
  width: 1194px;
  height: 219px;
  font-family: Aeonik;
  font-size: 61.04px;
  font-weight: 700;
  line-height: 73.25px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.download-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.download-icon {
  width: 250px;
  height: auto;
}

.landlord {
  width: 100%;
  height: 1334px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.landlord img {
  width: 1160.57px;
  height: 280px;
}

.landlord-container {
  /* width: 100%; */
  width: 1240px;
  background-image: url("../../assets/landlord/landbg.png");
  height: 798px;
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.landlord-container img {
  width: 375px;
  height: 737px;
  position: relative;
  top: -12rem;
}
.section-title {
  width: 312px;
  height: 292px;
  font-family: Aeonik;
  font-size: 61.04px;
  font-weight: 700;
  line-height: 73.25px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: white;
}

.benefit-item {
  width: 329px;
  height: 329px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.benefit-icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
}

.benefit-icon .icon {
  background-color: #1b9160;
  width: 30px;
  height: 30px;
}

.benefit-icon p {
  width: 286px;
  height: 56px;
  font-family: Aeonik;
  font-size: 23.04px;
  font-weight: 500;
  line-height: 27.65px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
/* Responsive Styles */

/* @media (max-width: 1300px) {
  .landlord-container {
    max-width: 1140px;
    display: none;
  }
} */

@media (max-width: 1200px) {
  .landlord-container {
    width: 1440px;
   
  }

  .mission {
    max-width: 1000px;
    height: 500px;
  }
  .mission-text {
    max-width: 900px;
    height: 180px;
    font-size: 50px;
    line-height: 60px;
  }
  .download-icon {
    width: 120px;
    height: 40px;
  }
  .landlord {
    height: 1000px;
  }
  .landlord img {
    width: 800px;
    height: 180px;
  }
  .landlord-container {
    width: 1000px;
    height: 600px;
  }
  .landlord-container img {
    width: 250px;
    height: 500px;
    top: -8rem;
  }
  .section-title {
    width: 250px;
    height: 200px;
    font-size: 40px;
    line-height: 50px;
  }
  .benefit-item {
    width: 250px;
    height: 250px;
  }
  .benefit-icon p {
    width: 200px;
    height: 50px;
    font-size: 20px;
    line-height: 25px;
  }
}

@media (max-width: 992px) {
  .mission {
    max-width: 800px;
    height: 400px;
  }
  .mission-text {
    max-width: 700px;
    height: 150px;
    font-size: 40px;
    line-height: 50px;
  }
  .download-links {
    flex-direction: column;
  }
  .download-icon {
    width: 100px;
    height: 35px;
  }
  .landlord {
    height: 800px;
  }
  .landlord img {
    width: 600px;
    height: 150px;
  }
  .landlord-container {
    width: 800px;
    height: 500px;
  }
  .landlord-container img {
    width: 200px;
    height: 400px;
    top: -6rem;
  }
  .section-title {
    width: 200px;
    height: 150px;
    font-size: 30px;
    line-height: 40px;
  }
  .benefit-item {
    width: 200px;
    height: 200px;
  }
  .benefit-icon p {
    width: 150px;
    height: 40px;
    font-size: 18px;
    line-height: 22px;
  }
}

@media (max-width: 768px) {
  .mission {
    max-width: 600px;
    height: 300px;
  }
  .mission-text {
    max-width: 500px;
    height: 120px;
    font-size: 30px;
    line-height: 40px;
  }
  .download-icon {
    width: 80px;
    height: 30px;
  }
  .landlord {
    height: 600px;
  }
  .landlord img {
    width: 400px;
    height: 120px;
  }
  .landlord-container {
    width: 600px;
    height: 400px;
  }
  .landlord-container img {
    width: 150px;
    height: 300px;
    top: -4rem;
  }
  .section-title {
    width: 150px;
    height: 100px;
    font-size: 25px;
    line-height: 35px;
  }
  .benefit-item {
    width: 150px;
    height: 150px;
  }
  .benefit-icon p {
    width: 100px;
    height: 30px;
    font-size: 15px;
    line-height: 20px;
  }
}

@media (max-width: 576px) {
  .mission {
    max-width: 450px;
    height: 250px;
  }
  .mission-text {
    max-width: 350px;
    height: 90px;
    font-size: 25px;
    line-height: 35px;
  }
  .download-icon {
    width: 60px;
    height: 25px;
  }
  .landlord {
    height: 450px;
  }
  .landlord img {
    width: 300px;
    height: 100px;
  }
  .landlord-container {
    width: 450px;
    height: 300px;
  }
  .landlord-container img {
    width: 100px;
    height: 200px;
    top: -2rem;
  }
  .section-title {
    width: 100px;
    height: 80px;
    font-size: 20px;
    line-height: 30px;
  }
  .benefit-item {
    width: 100px;
    height: 100px;
  }
  .benefit-icon p {
    width: 80px;
    height: 25px;
    font-size: 15px;
    line-height: 20px;
  }
}

@media (max-width: 480px) {
  .mission {
    max-width: 350px;
    height: 200px;
  }
  .mission-text {
    max-width: 250px;
    height: 60px;
    font-size: 20px;
    line-height: 30px;
  }
  .download-icon {
    width: 50px;
    height: 20px;
  }
  .landlord {
    height: 350px;
  }
  .landlord img {
    width: 250px;
    height: 80px;
  }
  .landlord-container {
    width: 350px;
    height: 250px;
  }
  .landlord-container img {
    width: 80px;
    height: 180px;
    top: -1rem;
  }
  .section-title {
    width: 80px;
    height: 60px;
    font-size: 18px;
    line-height: 25px;
  }
  .benefit-item {
    width: 80px;
    height: 80px;
  }
  .benefit-icon p {
    width: 60px;
    height: 20px;
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
