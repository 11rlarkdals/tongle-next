import React, { useState } from "react";

interface Props {
  subTitle: string;
}

const DropSubTitle: React.FC<Props> = ({}) => {
  const [subTitle, setSubTitle] = useState(false);

  return <div onClick={() => !subTitle}>aw</div>;
};

export default DropSubTitle;
