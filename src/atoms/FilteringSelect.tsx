import { memo, VFC } from "react";
import { Select } from "@chakra-ui/react";

type Props = {
  id: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const FilteringSelect: VFC<Props> = memo((props) => {
  const { name, id, value, onChange } = props;
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "notStarted", label: "未着手🐑" },
    { value: "inProgress", label: "着手❤️‍🔥" },
    { value: "done", label: "完了💮" }
  ];

  return (
    <>
      <Select name={name} id={id} value={value} onChange={onChange}>
        {filterOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </>
  );
});
