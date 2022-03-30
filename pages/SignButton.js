import styled from "styled-components";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import "./SignButton.css";

// position: absolute;
// top: 50%;
// left: 50%;
// margin-left: -65px;
// margin-top: -20px;
const Container = styled.div`
  width: 130px;
  height: 40px;
  text-align: center;
`;

const Button = styled.button`
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
  font-weight: bold;
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

export default function SignButton() {
  return (
    <Container>
      <Button
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
      </Button>
    </Container>
  );
}
