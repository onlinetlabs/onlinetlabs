import { useState, useEffect } from "react";

// Define the shape of the data stored in localStorage
interface LabData {
  labLink: string | null;
  labProjectId: string | null;
  labPort: number | null;
}

const LS_KEY = "currentlab";

// Helper function to get initial data from localStorage
export const getInitialLabData = (): LabData => {
  const storedData = localStorage.getItem(LS_KEY);
  return storedData ? JSON.parse(storedData) : { labLink: null, labProjectId: null, labPort: null };
};

// Helper function to set data in localStorage
export const setLabDataInLocalStorage = (data: Partial<LabData>) => {
  const currentData = getInitialLabData();
  const updatedData = { ...currentData, ...data };
  localStorage.setItem(LS_KEY, JSON.stringify(updatedData));
};

// Hook to manage lab data
export const useLab = () => {
  const [labData, setLabDataState] = useState<LabData>(getInitialLabData());

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(labData));
  }, [labData]);

  const setLabData = (data: Partial<LabData>) => {
    setLabDataState((prev) => ({ ...prev, ...data }));
  };

  const { labLink, labProjectId, labPort } = labData;

  return {
    link: labLink,
    projectId: labProjectId,
    port: labPort,
    setLabData,
  };
};