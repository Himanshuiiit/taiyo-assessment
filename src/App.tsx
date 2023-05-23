import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./Components/Contact.tsx/ContactList";
import ChartAndMaps from "./Components/ChartAndMaps/ChartAndMaps";
import ContactForm from "./Components/Contact.tsx/ContactForm";

function App() {
  const [open, setOpen] = React.useState<boolean>(true);
  const queryClient = new QueryClient({});

  return (
    <div className="flex flex-row relative w-full">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Sidebar open={open} setOpen={setOpen} />
          <Routes>
            <Route path="/" element={<Home open={open} setOpen={setOpen} />}>
              <Route path="" element={<ContactList />} />
              <Route path="addcontact" element={<ContactForm />} />
              <Route path="editcontact/:id" element={<ContactForm />} />
              <Route path="charts" element={<ChartAndMaps />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
