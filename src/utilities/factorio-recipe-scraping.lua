/silent-command
game.player.force.enable_all_recipes()
game.player.force.enable_all_technologies()
game.player.force.research_all_technologies(1)

/silent-command
listresources = {}
for a, b in pairs(game.player.force.recipes) do
    item = '{ "name": "' .. b.name .. '", "time": ' .. b.energy .. ', "subgroup": "' .. b.subgroup.order .. '", "group": "' .. b.group.name .. '", "products": ['
    productlist = {}
    for c,d in pairs (b.products) do
        if d.amount ~= nil then    
            product = '{ "name": "' .. d.name .. '", "amount": ' .. d.amount .. '}'
            table.insert(productlist,product) 
        end
    end
    item = item .. table.concat(productlist, ',') .. '], "ingredients": ['
    ingredientlist = {}
    for x,y in pairs (b.ingredients) do
        ingredient = '{ "name": "' .. y.name .. '", "amount": ' .. y.amount .. '}'
        table.insert(ingredientlist,ingredient)
    end
    item = item .. table.concat(ingredientlist, ',') .. '] }'
    table.insert(listresources,item) 
end
table.sort(listresources)
game.write_file('recipes.json', '[' .. table.concat(listresources, ',\r\n') .. ']')