/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";

//mantine
import {
  Table,
  Skeleton,
  Divider,
  TextInput,
  Modal,
  FileInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

//react icons
import {
  AiOutlineInbox,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFile,
} from "react-icons/ai";

//hooks
import { useAuth } from "../hooks";

//services
import {
  getBanned,
  createBanned,
  updateBanned,
  deleteBanned,
} from "../services";

export const DashboardLayout = () => {
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  async function fetchFile(url) {
    const response = await fetch(url);
    const data = await response.blob();
    const fileName = getFileNameFromUrl(url);

    return new File([data], fileName);
  }

  function getFileNameFromUrl(url) {
    const path = url.split("/").pop();
    const fileName = path.split("?")[0];
    return fileName;
  }

  //form
  const createUserForm = useForm({
    initialValues: {
      id: null,
      ipAddress: "",
      date: "",
      userAgent: "",
      file: null,
      requestId: "",
    },

    validate: {
      ipAddress: (value) => (value === "" ? "Field required" : null),
      date: (value) => (value === "" ? "Field required" : null),
      username: (value) => (value === "" ? "Field required" : null),
      userAgent: (value) => (value === "" ? "Field required" : null),
      file: (value) => (value === null ? "Field required" : null),
      requestId: (value) => (value === "" ? "Field required" : null),
    },
  });
  const rowsPerPage = 6;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasNext, setHasNext] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const token = useAuth();

  const openFile = (file) => {
    window.open(`http://localhost:3000/${file}`, "_blank");
  };

  const deleteTuple = async (id) => {
    const response = await deleteBanned(token, id);

    if (!response) {
      notifications.show({
        title: "Error",
        message: "Something wrong happened! ❌",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Deleted successfully ✅",
        color: "green",
      });
      fetchBanned();
      close();
    }
  };

  const rows = data.map((element, index) => (
    <tr key={index}>
      <td>{element.ipAddress}</td>
      <td>{element.date}</td>
      <td>{element.userAgent}</td>
      <td>{element.requestId}</td>
      <td>
        <div className="flex items-center gap-4">
          <Tooltip label="Open file">
            <span onClick={() => openFile(element.file)}>
              <AiOutlineFile
                fontSize={18}
                color="black"
                className=" cursor-pointer"
              />
            </span>
          </Tooltip>
          <Tooltip label="Edit">
            <span
              onClick={async () => {
                setIsEdit(true);
                const file = await fetchFile(element.file);
                createUserForm.setFieldValue("ipAddress", element.ipAddress);
                createUserForm.setFieldValue("date", element.date);
                createUserForm.setFieldValue("userAgent", element.userAgent);
                createUserForm.setFieldValue("requestId", element.requestId);
                createUserForm.setFieldValue("id", element.id);
                createUserForm.setFieldValue("file", file);
                open();
              }}
            >
              <AiOutlineEdit
                fontSize={18}
                color="blue"
                className=" cursor-pointer"
              />
            </span>
          </Tooltip>

          <Tooltip label="Delete">
            <span onClick={() => deleteTuple(element.id)}>
              <AiOutlineDelete
                fontSize={18}
                color="red"
                className=" cursor-pointer"
              />
            </span>
          </Tooltip>
        </div>
      </td>
    </tr>
  ));

  const fetchBanned = async () => {
    const response = await getBanned(token);
    response && setData(response);
    setLoading(false);
  };

  const createTuple = async (data) => {
    setBtnLoading(true);
    const response = await createBanned(token, data);

    if (!response) {
      notifications.show({
        title: "Error",
        message: "Something wrong happened! ❌",
        color: "red",
      });
      setBtnLoading(false);
    } else {
      notifications.show({
        title: "Success",
        message: "Created successfully ✅",
        color: "green",
      });
      setBtnLoading(false);
      setData((prevState) => [...prevState, response]);
      close();
    }
  };

  const updateTuple = async (data) => {
    setBtnLoading(true);
    const response = await updateBanned(token, data);

    if (!response) {
      notifications.show({
        title: "Error",
        message: "Something wrong happened! ❌",
        color: "red",
      });
      setBtnLoading(false);
    } else {
      notifications.show({
        title: "Success",
        message: "Updated successfully ✅",
        color: "green",
      });
      setBtnLoading(false);
      await fetchBanned();
      close();
    }
  };

  useEffect(() => {
    fetchBanned();
  }, []);

  return (
    <div className="flex flex-col pt-4">
      <div className="flex justify-between items-center">
        <span className="text-[#4C4C4C] font-xl font-mulish font-semibold">
          My Banned list
        </span>
        <button
          onClick={open}
          className="text-white text-sm font-mulish bg-primary h-10 px-4 rounded duration-300 hover:bg-primaryDark"
        >
          Create new tuple
        </button>
      </div>
      <span className="text-xs  text-[#B3B3B3]">list of banned users</span>
      <div className="pt-12 text-xs">
        <Table>
          <thead>
            <tr>
              <th>ipAddress</th>
              <th>Date </th>
              <th>userAgent</th>
              <th>requestId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows}
            {loading && (
              <tr>
                <td>
                  <Skeleton animate={true} height={16} radius="xl" width={80} />
                </td>
                <td>
                  <Skeleton animate={true} height={16} radius="xl" width={80} />
                </td>
                <td>
                  <Skeleton animate={true} height={16} radius="xl" width={80} />
                </td>
                <td>
                  <Skeleton animate={true} height={16} radius="xl" width={80} />
                </td>
                <td>
                  <Skeleton animate={true} height={16} radius="xl" width={80} />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {!loading && data?.length === 0 && (
          <div className="flex w-full justify-center py-4 items-center">
            <div className="flex flex-col items-center gap-2">
              <AiOutlineInbox fontSize={36} fontWeight={300} />
              <span className="font-mulish text-sm font-medium text-black">
                No Data
              </span>
            </div>
          </div>
        )}
        {!loading && data?.length === 0 && <Divider color="#E6E6E6" />}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title={
          <span className="font-mulish font-semibold text-lg">Create</span>
        }
        size="sm"
        centered
      >
        <form
          onSubmit={createUserForm.onSubmit((values) =>
            isEdit ? updateTuple(values) : createTuple(values)
          )}
          className="flex flex-col gap-3"
        >
          <TextInput
            label="ipAddress"
            size="xs"
            withAsterisk
            {...createUserForm.getInputProps("ipAddress")}
            sx={{
              input: {
                fontSize: "14px",
                height: "36px",
                fontFamily: "Mulish, sans-serif",
                border: "1px solid #D8D8D8",
                background: "#F8F8F8",
                borderRadius: "4px",
              },
            }}
          />
          <TextInput
            label="Date"
            size="xs"
            withAsterisk
            {...createUserForm.getInputProps("date")}
            sx={{
              input: {
                fontSize: "14px",
                height: "36px",
                fontFamily: "Mulish, sans-serif",
                border: "1px solid #D8D8D8",
                background: "#F8F8F8",
                borderRadius: "4px",
              },
            }}
          />

          <TextInput
            label="userAgent"
            size="xs"
            withAsterisk
            {...createUserForm.getInputProps("userAgent")}
            sx={{
              input: {
                fontSize: "14px",
                height: "36px",
                fontFamily: "Mulish, sans-serif",
                border: "1px solid #D8D8D8",
                background: "#F8F8F8",
                borderRadius: "4px",
              },
            }}
          />

          <TextInput
            label="requestId"
            size="xs"
            withAsterisk
            {...createUserForm.getInputProps("requestId")}
            sx={{
              input: {
                fontSize: "14px",
                height: "36px",
                fontFamily: "Mulish, sans-serif",
                border: "1px solid #D8D8D8",
                background: "#F8F8F8",
                borderRadius: "4px",
              },
            }}
          />

          <FileInput
            size="xs"
            withAsterisk
            {...createUserForm.getInputProps("file")}
            sx={{
              input: {
                fontSize: "14px",
                height: "36px",
                fontFamily: "Mulish, sans-serif",
                border: "1px solid #D8D8D8",
                background: "#F8F8F8",
                borderRadius: "4px",
              },
            }}
            label="File"
          />
          {isEdit && (
            <span
              onClick={() =>
                openFile(`uploads/${createUserForm.values.file.name}`)
              }
              className=" cursor-pointer text-sm text-primary font-semibold"
            >
              Preview file
            </span>
          )}
          <button
            type="submit"
            className="w-full rounded-[4px] bg-primary mt-4 duration-300 hover:bg-primaryDark text-white text-sm flex justify-center items-center h-10"
          >
            {btnLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
};
