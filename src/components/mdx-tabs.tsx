"use client";

import * as React from "react";
import { Tabs as TabsRoot, TabsList, TabsTrigger, TabsContent } from "./tabs";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  defaultTab?: number;
}

function TabsWrapper({ children, defaultTab = 0 }: TabsProps) {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  return (
    <TabsRoot defaultValue={String(defaultTab)} className="my-5">
      <TabsList>
        {tabs.map((tab, i) => (
          <TabsTrigger key={i} value={String(i)}>
            {tab.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={i} value={String(i)} className="pt-3 [&>p:last-child]:mb-0">
          {tab}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

export const Tabs = Object.assign(TabsWrapper, { Tab }) as typeof TabsWrapper & { Tab: typeof Tab };
export { Tab };
