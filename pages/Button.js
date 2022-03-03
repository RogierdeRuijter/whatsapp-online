import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -65px;
  margin-top: -20px;
  width: 130px;
  height: 40px;
  text-align: center;
`;

const But = styled.button`
  outline: none;
  height: 40px;
  text-align: center;
  width: 130px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid green;
  color: green;
  letter-spacing: 1px;
  text-shadow: 0;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: white;
    background: green;
  }
  &:active {
    letter-spacing: 2px;
  }
`;

// font: {
//   size: 12px;
//   weight: bold;
// }

// .onclic {
//   width: 40px;
//   border-color: $gray;
//   border-width: 3px;
//   font-size: 0;
//   border-left-color: $green;
//   animation: rotating 2s 0.25s linear infinite;

//   &:after {
//     content: "";
//   }
//   &:hover {
//     color: $green;
//     background: white;
//   }
// }
// .validate {
//   font-size: 13px;
//   color: white;
//   background: $green;
//   &:after {
//     font-family: "FontAwesome";
//     content: "\f00c";
//   }
// }

// @keyframes rotating {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }

export default function Button() {
  return (
    <div class="container">
      <But
        id="button"
        onClick={async () => {
          const fpPromise = FingerprintJS.load();
          const fp = await fpPromise;
          const fingerprint = await fp.get();

          // TODO: add domain based on environment
          let domain = process.env.DOMAIN;
          if (!domain) {
            domain = "https://goofy-darwin-b44948.netlify.app";
          }

          await fetch(`${domain}/api/sign`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // This is used to set the cookie returned by the API
            body: JSON.stringify({ visitorId: fingerprint.visitorId }),
          });
        }}
      >
        Sign petition
      </But>
    </div>
  );
}
