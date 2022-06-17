import './featuredInfo.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

export default function featuredInfo() {
  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2.26</span>
                <span className="featuredMoneyRate">
                    -11.5
                    <ArrowDownward className='featuredIcon negative'/>
                </span> 
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$18.26</span>
                <span className="featuredMoneyRate">
                    -11.5
                    <ArrowDownward className='featuredIcon negative'/>
                </span> 
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2.26</span>
                <span className="featuredMoneyRate">
                    +6.65
                    <ArrowUpward className='featuredIcon'/>
                </span> 
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
    </div>
  )
}
