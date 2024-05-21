export const LUA_COMMAND = `
listrecipes = {}
for a, b in pairs(game.recipe_prototypes) do
    item = '{ "name": "' .. b.name .. '", "order": "' .. b.order .. '", "subgroup": "' .. b.subgroup.order .. '", "group": "' .. b.group.name .. '", "category": "' .. b.category .. '", "products": ['
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
    table.insert(listrecipes,item) 
end
listitems = {}
for a, b in pairs(game.item_prototypes) do
    item = '{ "name": "' .. b.name .. '", "order": "' .. b.order .. '", "subgroup": "' .. b.subgroup.order .. '", "group": "' .. b.group.name .. '", "stackSize": ' .. b.stack_size .. ', "type": "'
    if b.place_result ~= nil then
        item = item .. b.place_result.type .. '", "tileWidth": ' .. b.place_result.tile_width .. ', "tileHeight": ' .. b.place_result.tile_height
        
    else
        item = item .. b.type .. '"'
    end
    item = item ..  ' }'
    table.insert(listitems,item) 
end
for a, b in pairs(game.fluid_prototypes) do
    item = '{ "name": "' .. b.name .. '", "order": "' .. b.order .. '", "subgroup": "' .. b.subgroup.order .. '", "group": "' .. b.group.name .. '", "type": "fluid" }'
    table.insert(listitems,item) 
end
table.sort(listitems)
table.sort(listrecipes)
game.write_file('factorio-data.json', '{ "recipes": [' .. table.concat(listrecipes, ',\r\n') .. '],\r\n\r\n"items": [' .. table.concat(listitems, ',\r\n') .. '] }')
`
