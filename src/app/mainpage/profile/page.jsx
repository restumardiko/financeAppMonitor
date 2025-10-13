import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Profile() {
  return (
    <div>
      Profile
      <div>
        <div className=" photo-profile"></div>
        <div className=" description-profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>

            <CardFooter>
              <p>6 persen less than last month</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
