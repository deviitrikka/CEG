import Lanyard from "@/components/Lanyard";
import TextType from "@/components/TextType";
import AnimatedBackground from "@/components/AnimatedBackground";
import FormsResult from "./FormsResult";

export default function HomeLayout() {

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-900 text-white">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
      <TextType 
        text={["Why be resume #847 in a pile no one reads?", "Be the email that actually gets a reply."]} 
        className="text-2xl font-bold text-center mb-2 " 
        initialDelay={5000} 
      /> 
      <FormsResult />
      </div>
      <Lanyard position={[10, 0, 25]} gravity={[0, -60, 0]} />
      
    </div>
  );
}