using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpenMapRepo.Model
{
    public class CityResponse
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public Microregion? Microregion { get; set; }
        public ImmediateRegion? ImmediateRegion { get; set; }
    }

    public class Microregion
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public Mesoregion? Mesoregion { get; set; }
    }

    public class Mesoregion
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public UF? UF { get; set; }
    }

    public class UF
    {
        public int Id { get; set; }
        public string? Sigla { get; set; }
        public string? Nome { get; set; }
        public Region? Region { get; set; }
    }

    public class Region
    {
        public int Id { get; set; }
        public string? Sigla { get; set; }
        public string? Name { get; set; }
    }

    public class ImmediateRegion
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public IntermediateRegion? IntermediateRegion { get; set; }
    }

    public class IntermediateRegion
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public UF? UF { get; set; }
    }

}
