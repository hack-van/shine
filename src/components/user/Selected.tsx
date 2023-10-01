import { api } from "@/utils/api";
import ErrorPage from "next/error";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { user } from "@nextui-org/react";

export const UserSelectedPrograms = ({ id }: { id: number }) => {
  const {
    data: userToPrograms,
    isError: isErrorUserToPrograms,
    isLoading: isLoadingUserToPrograms,
  } = api.user.getUserToPrograms.useQuery({ id });

  const {
    data: user,
    isError: isErrorProgram,
    isLoading: isLoadingProgram,
  } = api.user.getById.useQuery({ id });

  const pidSet = new Set(userToPrograms?.map((x) => x.pid));
  const { data: programs, isError, isLoading } = api.programs.getAll.useQuery();

  const selectedPrograms = programs
    ? programs?.filter((data) => pidSet.has(data.pid))
    : [];

  if (!isLoading && !isError && !programs) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Card className="flex flex-col items-start gap-5 p-5">
      <CardTitle>
        {user?.firstName} {user?.lastName}
      </CardTitle>
      <CardDescription>{user?.role}</CardDescription>
      <CardContent className="flex flex-col gap-5">
        <p>
          {user?.email}
          {user?.phoneNumber ? ` - ${user?.phoneNumber}` : ""}
        </p>

        {selectedPrograms && selectedPrograms.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3>Programs joined:</h3>
            <ol>
              {selectedPrograms?.map((p) => (
                <li key={p.pid}>
                  {p.name} - {p.location}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <>No program joined</>
        )}
      </CardContent>
    </Card>
  );
};
