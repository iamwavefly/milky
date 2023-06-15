import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuditTable from "@/components/settings/audit/auditTable";
import truncate from "@/helper/truncate";
import clipboard from "@/helper/clipboard";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  const [keys, setKeys] = useState<any>({});
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/subsidiary/get-keys`,
    "get"
  );
  // webhook
  const webhook = useFetch(
    `${baseUrl}/static/account/default/webhook/view`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    webhook?.handleSubmit();
  }, []);

  useEffect(() => {
    setKeys(data?.api_keys);
  }, [data]);

  return (
    <Dashboard title="Settings">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          API Keys & Webhooks
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          gap="20px"
          mt="32px"
        >
          {/* Webhook URL */}
          <Stack
            bgcolor="#FFFFFF"
            height="105px"
            padding="20px"
            justifyContent="space-between"
          >
            <Typography fontWeight={500} fontSize="16px" color="#262B40">
              Webhook URL
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {truncate(webhook?.data?.data?.callback_url, 30) ?? "N/A"}
              </Typography>
              <Button
                sx={{
                  border: "0.5px solid #E4E8F2",
                  height: "20px",
                  padding: "2px 4px",
                  borderRadius: 0,
                  color: "rgba(38, 43, 64, 0.8)",
                  fontSize: "10px",
                  ml: "25px",
                }}
                onClick={() => clipboard(webhook?.data?.data?.callback_url)}
              >
                Copy
              </Button>
            </Stack>
          </Stack>
          {/* Public Key */}
          <Stack
            bgcolor="#FFFFFF"
            height="105px"
            padding="20px"
            justifyContent="space-between"
          >
            <Typography fontWeight={500} fontSize="16px" color="#262B40">
              Public Key
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {truncate(keys?.public_key ?? "N/A", 30)}
              </Typography>
              <Button
                sx={{
                  border: "0.5px solid #E4E8F2",
                  height: "20px",
                  padding: "2px 4px",
                  borderRadius: 0,
                  color: "rgba(38, 43, 64, 0.8)",
                  fontSize: "10px",
                  ml: "25px",
                }}
                onClick={() => clipboard(keys?.public_key)}
              >
                Copy
              </Button>
            </Stack>
          </Stack>
          {/*  Secret Key */}
          <Stack
            bgcolor="#FFFFFF"
            height="105px"
            padding="20px"
            justifyContent="space-between"
          >
            <Typography fontWeight={500} fontSize="16px" color="#262B40">
              Secret Key
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {truncate(keys?.secret_key ?? "N/A", 30)}
              </Typography>
              <Button
                sx={{
                  border: "0.5px solid #E4E8F2",
                  height: "20px",
                  padding: "2px 4px",
                  borderRadius: 0,
                  color: "rgba(38, 43, 64, 0.8)",
                  fontSize: "10px",
                  ml: "25px",
                }}
                onClick={() => clipboard(keys?.secret_key)}
              >
                Copy
              </Button>
            </Stack>
          </Stack>
          {/*  Encryption Key */}
          <Stack
            bgcolor="#FFFFFF"
            height="105px"
            padding="20px"
            justifyContent="space-between"
          >
            <Typography fontWeight={500} fontSize="16px" color="#262B40">
              Encryption Key
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {truncate(keys?.encryption_key ?? "N/A", 30)}
              </Typography>
              <Button
                sx={{
                  border: "0.5px solid #E4E8F2",
                  height: "20px",
                  padding: "2px 4px",
                  borderRadius: 0,
                  color: "rgba(38, 43, 64, 0.8)",
                  fontSize: "10px",
                  ml: "25px",
                }}
                onClick={() => clipboard(keys?.encryption_key)}
              >
                Copy
              </Button>
            </Stack>
          </Stack>
          {/*  Encryption Key end */}
        </Stack>
      </Stack>
    </Dashboard>
  );
};

export default Index;
