import TimerDisplay from "./TimerDisplay"

type HeaderProps = {
  timeDiff: string;
}
const Header  = (props: HeaderProps) => {
  const { timeDiff } = props;
  return <header>
    <TimerDisplay timeDiff={timeDiff} />
  </header>
}

export default Header;