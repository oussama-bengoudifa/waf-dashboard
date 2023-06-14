//mantine
import { AppShell, Navbar } from "@mantine/core";

//components
import { Sidebar } from "../components";

//layouts
import { DashboardLayout } from "../layouts";

//hoc
import { withGuard } from "../hoc";

const Dashboard = () => {
  return (
    <AppShell
      padding="xl"
      navbar={
        <Navbar
          width={{ xs: 81, sm: 243 }}
          sx={{
            background: "transparent",
            border: "none",
          }}
          height={"100%"}
        >
          <Sidebar active={"dashboard"} />
        </Navbar>
      }
    >
      <DashboardLayout />
    </AppShell>
  );
};

const DashboardWithGuard = withGuard(Dashboard);

export { DashboardWithGuard as Dashboard };
