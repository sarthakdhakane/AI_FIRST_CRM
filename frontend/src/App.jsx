import Header from "./components/layout/Header";
import DashboardLayout from "./components/layout/DashboardLayout";

import InteractionForm from "./components/form/InteractionForm";
import ChatPanel from "./components/chat/ChatPanel";

function App() {
  return (
    <>
      <Header />

      <DashboardLayout
        left={<InteractionForm />}
        right={<ChatPanel />}
      />
    </>
  );
}

export default App;