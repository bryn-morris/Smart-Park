import ReLogModal from "./Logging/ReLogModal"
import NavContainer from "./Navigation/NavContainer"
import LogOutModal from "./Logging/LogOutModal"
import CheckInModal from "./CheckIn/CheckInModal"

function SiteModals () {
    return(
      <>
        <ReLogModal />
        <NavContainer />
        <LogOutModal/>
        <CheckInModal/>
      </>
    )
  }

export default SiteModals