interface HelloProps {
  mes: string;
  dd?: string;
}

const Hello = (props: HelloProps) => {
  return (
    <h1>
      {props.mes}
      {props.dd}
    </h1>
  );
};

// Hello.props = ["mes", "ab"];
export default Hello;
