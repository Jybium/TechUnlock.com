<
  name="unit"
  control={form.control}
  render={({ field }) => (
    <Select {...field} onValueChange={field.onChange}>
      <SelectTrigger className="lg:w-2/3 bg-[#EFF1F999]/60">
        <SelectValue placeholder="bottles" />
      </SelectTrigger>
      <SelectContent className="lg:w-2/3">
        {units.map((item: string) => (
          <SelectItem value={item.toUpperCase()} key={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
/>;

 <FormControl>
<Controller
  name="is_certificate"
  control={form.control}
  render={({ field }) => (
   <Select {...field}>
     <SelectTrigger className="rounded">
       <SelectValue placeholder="Select" />
     </SelectTrigger>
     <SelectContent className="min-w-[8rem]">
       <SelectItem value={true}>Yes</SelectItem>
       <SelectItem value={false}>No</SelectItem>
        ))}
     </SelectContent>
   </Select>
  )}
  />
 </FormControl>