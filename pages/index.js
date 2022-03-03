import styled from "styled-components";
import maxres from "../public/maxresdefault.jpg";
import Image from "next/image";
import Button from "./Button";

const Wrapper = styled.div`
  background-color: #fff;
`;

const Container = styled.div`
  p > {
    line-height: 1.4;
  }
`;

export default function Home() {
  return (
    <Wrapper style={{ display: "flex", flexWrap: "wrap" }}>
      <Container style={{ width: "700px", maxWidth: "100%" }}>
        <header>
          <h1>Lets take back our privacy</h1>
        </header>
        <p>
          Currenly, we cant be anonyoums on Whatsapp. The other person will
          always see if we are online or not.
        </p>
        <Image src={maxres} placeholder="blur" />
        <p>Sign this petition to transform Whatsapp.</p>
        <div>
          <Button />
          <span>Total signatures: 0</span>
        </div>
      </Container>
      <aside style={{ padding: "1em", marginRight: "2%" }}>
        <h4>Milestones</h4>
        <ul>
          <li>100</li>
          <li>1.000</li>
          <li>5.000</li>
          <li>5.000</li>
          <li>10.000</li>
          <li>50.000</li>
          <li>100.000</li>
        </ul>
      </aside>
    </Wrapper>
  );
}
