import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const InputError = ({ message }) => {
  return (
    <div className="w-full flex justify-center bg-red-500 p-2 text-white rounded-full mt-3">
      <p className="flex flex-row gap-2">
        <ReportProblemIcon />
        {message}
      </p>
    </div>
  );
};

export default InputError;
