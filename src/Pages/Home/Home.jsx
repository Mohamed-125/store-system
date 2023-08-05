import ChartBox from '../../components/chartBox/ChartBox'
import Charts from '../../components/charts/Charts'
const Home = () => {
  return (
    <>
<div className="flex flex-row flex-wrap min-h-fit">
  <div className="basis-2/3 min-h-fit"><ChartBox/></div>
  <div className="basis-1/3 px-3 min-h-fit"><Charts/></div>
</div>
    </>
  )
}

export default Home