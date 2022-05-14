import { Card, Skeleton } from "antd";
import { memo, VFC } from "react";

type PropsTypes = {
  count: number;
};

const LoadingCard: VFC<PropsTypes> = memo(({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-12" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row pd-5">{cards()}</div>;
});

export default LoadingCard;
