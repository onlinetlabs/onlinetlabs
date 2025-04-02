import { UserChecklog } from "@entities/lab/types";
import { cn } from "@lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    type: 'done',
    title: 'Created Workspace',
    description:
      'You successfully created your first workspace in privacy mode',
    activityTime: '3d ago',
  },
  {
    id: 2,
    type: 'done',
    title: 'Connected database',
    description: 'Database connected to MySQL test database',
    activityTime: '2d ago',
  },
  {
    id: 3,
    type: 'done',
    title: 'Add payment method',
    description: 'Payment method for monthly billing added',
    activityTime: '31min ago',
  },
  {
    id: 4,
    type: 'in progress',
    title: 'Audit trails',
    description: 'Identifying security issues or unauthorized policy settings',
    activityTime: 'Running now...',
  },
  {
    id: 5,
    type: 'open',
    title: 'Invite team members',
    description: 'Add team members to workspace',
    activityTime: 'Upcoming',
  },
];

export default function AutoCheck({ logs }: { logs: UserChecklog['checklog'] }) {
  return (
    <ul role="list" className="space-y-6">
      {Object.entries(logs).map(([key, passed], stepIdx) => (
        <li key={stepIdx} className="relative flex gap-x-3">
          <div
            className={cn(
              stepIdx === steps.length - 1 ? 'h-6' : '-bottom-6',
              'absolute left-0 top-0 flex w-6 justify-center',
            )}
          >
            <span
              className="w-px bg-border"
              aria-hidden={true}
            />
          </div>
          <div className="flex items-start space-x-2.5">
            <div className="relative flex size-6 flex-none items-center justify-center bg-background">
              {passed ? (
                <CheckIcon
                  className="size-5 text-ds-blue-900"
                  aria-hidden={true}
                />
              ) : (
                <XIcon
                  className="size-5 text-ds-red-900"
                  aria-hidden={true}
                />
              )}
            </div>
            <div>
              <p className="mt-0.5 text-sm font-medium text-foreground">
                {key}{' '}
                {/* <span className="font-normal text-muted-foreground">
                  &#8729; 3d ago
                </span> */}
              </p>
              <p className="mt-0.5 text-sm/6 text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}