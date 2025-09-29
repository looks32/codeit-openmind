import Input from '../components/Input';
import Qcard from '../components/Qcard';
import Reaction from '../components/Reaction';

function Home() {
  return (
    <div>
      <Input value="아초" placeholder="이름을 입력하세요" />
      <Qcard profile="사진" nickName="아초는고양이" question="9" />
      <Reaction />
    </div>
  );
}

export default Home;
