import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuditTable from "@/components/settings/audit/auditTable";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  return (
    <Dashboard title="Audit trails">
      <Stack>
        <Box>
          <AuditTable />
        </Box>
      </Stack>
    </Dashboard>
  );
};

export default Index;
