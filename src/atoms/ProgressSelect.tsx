import { memo, VFC } from "react";
import { Select } from "@chakra-ui/react";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ProgressSelect: VFC<Props> = memo((props) => {
  const { name, id, value, onChange } = props;
  const filterOptions = [
    { label: "" },
    { label: "未着手🐑" },
    { label: "着手❤️‍🔥" },
    { label: "完了💮" }
  ];
  return (
    <>
      <Select name={name} id={id} value={value} onChange={onChange}>
        {filterOptions.map(({ label }) => (
          <option key={label}>{label}</option>
        ))}
      </Select>
    </>
  );
});
