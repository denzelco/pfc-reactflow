import './App.css'
import PFCDiagramComponent from './Diagram'
import { PFCContextProvider } from './dev/PFCContextProvider'
import StatusCard from './components/StatusCard'

function App() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <PFCContextProvider>
        <PFCDiagramComponent />
      </PFCContextProvider>
    </div>
  )
}

export default App
